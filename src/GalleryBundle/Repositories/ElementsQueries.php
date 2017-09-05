<?php

namespace GalleryBundle\Repositories;

use GalleryBundle\Entity\Images;
use Doctrine\ORM\EntityRepository;

class ElementsQueries extends EntityRepository
{
    public function getImageFromDir($pid = null): array
    {
        $query = $this->createQueryBuilder('e')
            ->select('e')
            ->orderBy('e.name', 'ASC')
            ->where('e.pid=:pid')
            ->setParameter('pid', $pid);

        if (!$pid||$pid=='null') {
            $query->orWhere('e.pid is NULL');
        }
        return $query->getQuery()->getArrayResult();
    }
}
