<?php

namespace GalleryBundle\Services;

use Doctrine\DBAL\Schema\AbstractAsset;
use GalleryBundle\Entity\Images;

class ImageService extends AbstractService
{
    public function getImageFromFolder($pid = null): array
    {
        $repository = $this->em->getRepository(Images::class);
        return $repository->getImageFromDir($pid);
    }

    public function deleteImage($id)
    {
        $image = $this->em->find(Images::class, $id);

        if (!$image) {
            return 'The image with this id does not exist';
        }
        try {
            $this->em->remove($image);
            $this->em->flush();
        } catch (ORMException $e) {
            return $e->getMessage();
        }
        return false;
    }

    public function renameImage($id, $name)
    {
        $image = $this->em->find(Images::class, $id);

        if (!$image) {
            return 'The image with this id does not exist';
        }
        try {
            $image->setName($name);
            $this->em->flush();
        } catch (ORMException $e) {
            return $e->getMessage();
        }

        return false;
    }
}