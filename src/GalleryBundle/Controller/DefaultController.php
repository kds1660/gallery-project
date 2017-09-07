<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @return Response
     */
    public function indexAction(): Response
    {
        return $this->render('@Gallery/index.html.twig');
    }

    /**
     * @return Response
     */
    public function getFolderAction(): Response
    {
        $galDir = $this->container->getParameter('gallery_directory');
        return new Response($galDir, 200);
    }
}
