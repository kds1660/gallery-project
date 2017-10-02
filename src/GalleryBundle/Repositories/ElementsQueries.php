<?php

namespace GalleryBundle\Repositories;

use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityRepository;
use GalleryBundle\Entity\Directories;

class ElementsQueries extends EntityRepository
{
    /**
     * @param $limit
     * @param $offset
     * @param null $pid
     * @return array
     */
    public function getImageFromDir($limit, $offset, $pid = null): array
    {
        $query = $this->createQueryBuilder('e')
            ->select('e')
            ->orderBy('e.name', 'ASC')
            ->where('e.pid=:pid')
            ->setParameter('pid', $pid)
            ->setFirstResult($offset)
            ->setMaxResults($limit);

        if (!$pid || $pid === 'null') {
            $query->orWhere('e.pid is NULL');
        }
        return $query->getQuery()->getArrayResult();
    }

    /**
     * @param $id
     * @param $name
     * @param $newName
     * @return string
     */
    public function updatePathDirs($id, $name, $newName): string
    {
        $this->_em->getConnection()->beginTransaction();

        try {
            $sql = "update `directories` 
set directories.path = REPLACE (directories.path,:old,:new)
WHERE directories.path LIKE :find";
            $query = $this->_em->getConnection()->prepare($sql);
            $query->bindValue('old', $name . '&' . $id);
            $query->bindValue('find', '%' . $name . '&' . $id . '%');
            $query->bindValue('new', $newName . '&' . $id);
            $query->execute();

            $query = $this->createQueryBuilder('e')
                ->update(Directories::class, 'e')
                ->set('e.name', ':name')
                ->where('e.id=:id')
                ->setParameter('id', $id)
                ->setParameter('name', $newName)
                ->getQuery();
            $query->execute();
            $this->_em->getConnection()->commit();
        } catch (DBALException $e) {
            $this->_em->getConnection()->rollBack();
            return $e->getMessage();
        }
        return '';


    }
}
