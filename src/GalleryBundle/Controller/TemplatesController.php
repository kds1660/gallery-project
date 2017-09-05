<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class TemplatesController extends Controller
{
    /**
     * @param $tmpl
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($tmpl) : Response
    {
        return $this->render('@Gallery/templates/' . $tmpl . '.html.twig');
    }
}
