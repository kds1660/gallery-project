<?php

namespace GalleryBundle\Services;

use Doctrine\DBAL\DBALException;
use GalleryBundle\Entity\Directories;
use GalleryBundle\Entity\Images;
use \Imagick;

class ImageService extends AbstractService
{
    /**
     * @param null $pid
     * @return array
     */
    public function getImageFromFolder($pid = null): array
    {
        $repository = $this->em->getRepository(Images::class);
        return $repository->getImageFromDir($pid);
    }

    /**
     * @param $id
     * @return bool|string
     */
    public function deleteImage($id)
    {
        $image = $this->em->find(Images::class, $id);

        if (!$image) {
            return 'The image with this id does not exist';
        }

        try {
            $this->em->remove($image);
            $this->em->flush();
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        return false;
    }

    /**
     * @param $id
     * @param $name
     * @return bool|string
     */
    public function renameImage($id, $name)
    {
        $image = $this->em->find(Images::class, $id);

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
     * @return bool|string
     */
    public function addImage($name, $pid, $file)
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

        $image = new Imagick($this->galleryDir . $fileName);

        if ($image->getImageWidth() > 1024 || $image->getImageHeight() > 768) {
            $image->adaptiveResizeImage(1024, 768);
            $image->writeImage($this->galleryDir . $fileName);
        }
        $image->adaptiveResizeImage(150, 150);
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
        return false;
    }
}
