<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Response;

class TemplatesController
{
    protected $templating;

    /**
     * TemplatesController constructor.
     * @param EngineInterface $templating
     */
    public function __construct(EngineInterface $templating)
    {
        $this->templating = $templating;
    }

    /**
     * @param $tmpl
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($tmpl): Response
    {
        return $this->templating->renderResponse('@Gallery/templates/' . $tmpl . '.html.twig');
    }
}
