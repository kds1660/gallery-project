<?php

namespace GalleryBundle\Services;

use Doctrine\DBAL\DBALException;
use GalleryBundle\Entity\Directories;
use Symfony\Component\HttpFoundation\JsonResponse;

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
     * @param Directories $dir
     * @return string
     */
    public function deleteDir(Directories $dir): string
    {

        if (!$dir) {
            return 'The directory with this id does not exist';
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
     * @param Directories $dir
     * @param $name
     * @return string
     */
    public function renameDir(Directories $dir, $name): string
    {

        if (!$dir) {
            return 'The directory with this id does not exist';
        }
        $errors = $this->validator->validate($dir);

        if (count($errors) > 0) {
            return (string)$errors;
        }
        $repository = $this->em->getRepository(Directories::class);

        return $repository->updatePathDirs($dir->getId(), $dir->getName(), $name);
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
            $dirPath = $elmDir->getPath() . Directories::P_SEPAR .
                $elmDir->getName() . Directories::E_SEPAR . $elmDir->getId();
        }

        if (!isset($dirPath)) {
            $dirPath = ' ';
        }
        $dir = new Directories();
        $dir->setName($name);
        $dir->setPid($elmDir);
        $dir->setPath($dirPath);
        $errors = $this->validator->validate($dir);

        if (count($errors) > 0) {
            return (string)$errors;
        }

        try {
            $this->em->persist($dir);
            $this->em->flush();
            //mayby set self dir in path
        } catch (DBALException $e) {
            return $e->getMessage();
        }
        return '';
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function getDirParents($id): JsonResponse
    {
        $dir = $this->em->find(Directories::class, $id);
        $path = trim($dir->getPath()) . Directories::P_SEPAR . $dir->getName() . Directories::E_SEPAR . $dir->getId();
        $path = explode(Directories::P_SEPAR, $path);

        if ($dir) {
            return new JsonResponse($path);
        }
        return new JsonResponse('');
    }
}
