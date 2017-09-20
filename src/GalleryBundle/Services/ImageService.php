<?php

namespace GalleryBundle\Services;

use Doctrine\DBAL\DBALException;
use GalleryBundle\Entity\Directories;
use GalleryBundle\Entity\Images;
use \Imagick;

class ImageService extends AbstractService
{
    /**
     * @param $limit
     * @param $offset
     * @param null $pid
     * @return array
     */
    public function getImageFromFolder($limit, $offset, $pid = null): array
    {
        $repository = $this->em->getRepository(Images::class);
        return $repository->getImageFromDir($limit, $offset, $pid);
    }

    /**
     * @param $id
     * @return bool|string
     */
    public function deleteImage($image): string
    {
        if (!$image) {
            return 'The image with this id does not exist';
        }

        try {
            $this->em->remove($image);
            $this->em->flush();
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        if (file_exists($this->galleryDir . 'thumb_' . $image->getPath())) {
            unlink($this->galleryDir . 'thumb_' . $image->getPath());
        }
        if (file_exists($this->galleryDir . $image->getPath())) {
            unlink($this->galleryDir . $image->getPath());
        }


        return '';
    }

    /**
     * @param $id
     * @param $name
     * @return bool|string
     */
    public function renameImage($image, $name): string
    {
        if (!$image) {
            return 'The image with this id does not exist';
        }

        try {
            $image->setName($name);
            $this->em->flush();
        } catch (DBALException $e) {
            return $e->getMessage();
        }

        return false;
    }

    /**
     * @param $name
     * @param $pid
     * @param $file
     * @return string
     */
    public function addImage($name, $pid, $file): string
    {
        $parentDir = null;

        if ($pid) {
            $parentDir = $this->em->find(Directories::class, $pid);
        }

        $prefix = md5(uniqid('', false));
        $fileName = $prefix . '.' . $file->guessExtension();
        $file->move(
            $this->galleryDir,
            $fileName
        );
        $imageSize = $this->imageSize['image'];
        $thumbSize = $this->imageSize['thumb'];

        $image = new Imagick($this->galleryDir . $fileName);

        if ($image->getImageWidth() > $imageSize['width'] || $image->getImageHeight() > $imageSize['height']) {
            $image->adaptiveResizeImage($imageSize['width'], $imageSize['height']);
            $image->writeImage($this->galleryDir . $fileName);
        }
        $image->adaptiveResizeImage($thumbSize['height'], $thumbSize['height']);
        $image->writeImage($this->galleryDir . 'thumb_' . $fileName);

        try {
            $img = new Images();
            $img->setName($name);
            $img->setPid($parentDir);
            $img->setPath($fileName);
            $this->em->persist($img);
            $this->em->flush();
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        return '';
    }
}
