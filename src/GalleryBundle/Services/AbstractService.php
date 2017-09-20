<?php

namespace GalleryBundle\Services;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Container;

class AbstractService
{
    protected $em;

    /**
     * AbstractService constructor.
     * @param EntityManagerInterface $entityManager
     * @param $galleryDir
     * @param null $imageSize
     */
    public function __construct(EntityManagerInterface $entityManager, $galDir, $imageSize = null, Container $container)
    {
        $this->em = $entityManager;
        $this->galleryDir = $galDir;
        $this->imageSize = $imageSize;
        $this->validator = $container->get('validator');
    }
}
