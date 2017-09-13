<?php

namespace GalleryBundle\Services;

use Doctrine\ORM\EntityManagerInterface;

class AbstractService
{
    protected $em;

    /**
     * AbstractService constructor.
     * @param EntityManagerInterface $entityManager
     * @param $galleryDir
     * @param null $imageSize
     */
    public function __construct(EntityManagerInterface $entityManager, $galleryDir, $imageSize = null)
    {
        $this->em = $entityManager;
        $this->galleryDir = $galleryDir;
        $this->imageSize = $imageSize;
    }
}
