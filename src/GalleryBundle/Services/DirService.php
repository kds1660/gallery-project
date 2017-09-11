<?php

namespace GalleryBundle\Services;

use Doctrine\DBAL\DBALException;
use Doctrine\DBAL\Schema\AbstractAsset;
use GalleryBundle\Entity\Directories;
use GalleryBundle\Entity\Images;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\ORMException;

class DirService extends AbstractService
{
    /**
     * @param null $pid
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getDirsFromFolder($limit, $offset, $pid = null): array
    {
        $repository = $this->em->getRepository(Directories::class);
        return $repository->getImageFromDir($limit, $offset, $pid);
    }

    /**
     * @param $id
     * @return string
     */
    public function deleteDir($id): string
    {
        $dir = $this->em->find(Directories::class, $id);

        if (!$dir) {
            return 'The image with this id does not exist';
        }

        try {
            $this->em->remove($dir);
            $this->em->flush();
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        return '';
    }

    /**
     * @param $id
     * @param $name
     * @return string
     */
    public function renameDir($id, $name): string
    {
        $dir = $this->em->find(Directories::class, $id);
        if (!$dir) {
            return 'The image with this id does not exist';
        }

        try {
            $dir->setName($name);
            $this->em->flush();
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        return '';
    }

    /**
     * @param $name
     * @param $pid
     * @return string
     */
    public function addDir($name, $pid): string
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
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        return '';
    }
}