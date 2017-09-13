<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\DependencyInjection\Container;

class DirectoryController extends Controller
{
    protected $imageService;
    protected $dirService;

    /**
     * DirectoryController constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->imageService = $container->get('gallery.image_service');
        $this->dirService = $container->get('gallery.dir_service');
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function getDirElements(Request $request, $id): JsonResponse
    {
        $limit = $request->query->get('limit');
        $dirOffset = $request->query->get('dirOffset');
        $imgOffset = $request->query->get('imgOffset');
        $files = $this->imageService->getImageFromFolder($limit, $imgOffset, $id);
        $dirs = $this->dirService->getDirsFromFolder($limit, $dirOffset, $id);
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
    public function delete($id): Response
    {
        $result = $this->dirService->deleteDir($id);

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
    public function edit(Request $request, $id): Response
    {
        $newName = $request->getContent();
        $result = $this->dirService->renameDir($id, $newName);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Directory renamed', 200);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function add(Request $request): Response
    {
        $req = $request->getContent();
        $req = json_decode($req);
        $name = $req->name;
        $pid = $req->pid;
        $result = $this->dirService->addDir($name, $pid);
        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Directory added', 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getPath(Request $request): JsonResponse
    {
        $id = $request->query->get('id');
        if ($id) {
            return $this->dirService->getDirParents($id);
        }
        return new JsonResponse('');
    }
}
