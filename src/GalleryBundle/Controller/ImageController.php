<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    /**
     * @param $id
     * @return Response
     */
    public function deleteAction($id): Response
    {
        $result = $this->container->get('gallery.image_service')->deleteImage($id);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Image deleted', 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return Response
     */
    public function editAction(Request $request, $id): Response
    {
        $newName = $request->getContent();
        $result = $this->container->get('gallery.image_service')->renameImage($id, $newName);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Image renamed', 200);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function newAction(Request $request): Response
    {
        $file = $request->files->get('file');
        $imgName = $request->request->get('name');
        $imgPid = $request->request->get('pid');

        $result = $this->container->get('gallery.image_service')->addImage($imgName, $imgPid, $file);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Image created', 200);
    }
}