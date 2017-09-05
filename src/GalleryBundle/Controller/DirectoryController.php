<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DirectoryController extends Controller
{
    public function getDirElementsAction(Request $request, $id): JsonResponse
    {
        $files = $this->container->get('gallery.image_service');
        $dirs = $this->container->get('gallery.dir_service');
        return new JsonResponse([
            'id' => $id,
            'images' => $files->getImageFromFolder($id),
            'directories' => $dirs->getDirsFromFolder($id)
        ]);
    }

    public function deleteAction(Request $request, $id): Response
    {
        $result = $this->container->get('gallery.dir_service')->deleteDir($id);

        if ($result) {
            throw $this->createNotFoundException($result);
        }
        return new Response('Directory deleted', 200);
    }

    public function editAction(Request $request, $id): Response
    {
        $newName = $request->getContent();
        $result = $this->container->get('gallery.dir_service')->renameDir($id, $newName);

        if ($result) {
            throw $this->createNotFoundException($result);
        }
        return new Response('Directory renamed', 200);
    }

    public function addAction(Request $request): Response
    {
        $req = $request->getContent();
        $req = json_decode($req);
        $name = $req->name;
        $pid = $req->pid;
        $result = $this->container->get('gallery.dir_service')->addDir($name, $pid);

        if ($result) {
            throw $this->createNotFoundException($result);
        }
        return new Response('Directory added', 200);
    }
}
