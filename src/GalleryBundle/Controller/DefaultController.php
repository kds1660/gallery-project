<?php

namespace GalleryBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\DependencyInjection\Container;

class DefaultController
{
    protected $templating;
    protected $galleryDir;

    public function __construct(EngineInterface $templating, Container $container)
    {
        $this->templating = $templating;
        $this->galleryDir = $container->getParameter('gallery_directory');
    }

    /**
     * @return Response
     */
    public function indexAction(): Response
    {
        return $this->templating->renderResponse('@Gallery/index.html.twig');
    }

    /**
     * @return Response
     */
    public function getFolder(): Response
    {
        $galDir = $this->galleryDir;
        return new Response($galDir, 200);
    }
}
