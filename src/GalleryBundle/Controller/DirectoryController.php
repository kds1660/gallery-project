<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DirectoryController extends Controller
{
    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getDirElementsAction(Request $request, $id): JsonResponse
    {
        $limit = $request->query->get('limit');
        $dirOffset = $request->query->get('dirOffset');
        $imgOffset = $request->query->get('imgOffset');
        $files = $this->container->get('gallery.image_service')->getImageFromFolder($limit, $imgOffset, $id);
        $dirs = $this->container->get('gallery.dir_service')->getDirsFromFolder($limit, $dirOffset, $id);
        return new JsonResponse([
            'id' => $id,
            'images' => $files,
            'directories' => $dirs
        ]);
    }

    /**
     * @param $id
     * @return Response
     */
    public function deleteAction($id): Response
    {
        $result = $this->container->get('gallery.dir_service')->deleteDir($id);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Directory deleted', 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return Response
     */
    public function editAction(Request $request, $id): Response
    {
        $newName = $request->getContent();
        $result = $this->container->get('gallery.dir_service')->renameDir($id, $newName);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Directory renamed', 200);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function addAction(Request $request): Response
    {
        $req = $request->getContent();
        $req = json_decode($req);
        $name = $req->name;
        $pid = $req->pid;
        $result = $this->container->get('gallery.dir_service')->addDir($name, $pid);
        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Directory added', 200);
    }
}
