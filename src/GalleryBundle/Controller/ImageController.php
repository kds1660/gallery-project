<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\ORM\ORMException;

class ImageController extends Controller
{
    public function deleteAction(Request $request, $id): Response
    {
        $result = $this->container->get('gallery.image_service')->deleteImage($id);

        if ($result) {
            throw $this->createNotFoundException($result);
        }
        return new Response('Image deleted', 200);
    }

    public function editAction(Request $request, $id): Response
    {
        $newName = $request->getContent();
        $result = $this->container->get('gallery.image_service')->renameImage($id, $newName);

        if ($result) {
            throw $this->createNotFoundException($result);
        }
        return new Response('Image renamed', 200);
    }

}