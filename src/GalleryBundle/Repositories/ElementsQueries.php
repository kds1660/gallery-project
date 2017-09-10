<?php

namespace GalleryBundle\Repositories;

use Doctrine\ORM\EntityRepository;

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
}
