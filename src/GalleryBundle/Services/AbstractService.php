<?php

namespace GalleryBundle\Services;

use Doctrine\ORM\EntityManagerInterface;

class AbstractService
{
    protected $em;

    public function __construct(EntityManagerInterface $entityManager, $galleryDir)
    {
        $this->em = $entityManager;
        $this->galleryDir = $galleryDir;
    }
}
