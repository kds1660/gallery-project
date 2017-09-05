<?php

namespace GalleryBundle\Services;

use Doctrine\DBAL\Schema\AbstractAsset;
use GalleryBundle\Entity\Directories;
use GalleryBundle\Entity\Images;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\ORMException;

class DirService extends AbstractService
{
    public function getDirsFromFolder($pid = null): array
    {
        $repository = $this->em->getRepository(Directories::class);
        return $repository->getImageFromDir($pid);
    }

    public function deleteDir($id)
    {
        $dir = $this->em->find(Directories::class, $id);
        if (!$dir) {
            return 'The image with this id does not exist';
        }

        try {
            $this->em->remove($dir);
            $this->em->flush();
        } catch (ORMException $e) {
            return $e->getMessage();
        }
        return false;
    }

    public function renameDir($id, $name)
    {
        $dir = $this->em->find(Directories::class, $id);
        if (!$dir) {
            return 'The image with this id does not exist';
        }

        try {
            $dir->setName($name);
            $this->em->flush();
        } catch (ORMException $e) {
            return $e->getMessage();
        }
        return false;
    }

    public function addDir($name, $pid)
    {
        $elmDir = null;
        if ($pid) {
            $elmDir = $this->em->find(Directories::class, $pid);
        }

        try {
            $dir = new Directories();
            $dir->setName($name);
            $dir->setPid($elmDir);
            $this->em->persist($dir);
            $this->em->flush();
        } catch (ORMException $e) {
            return $e->getMessage();
        }
        return false;
    }
}