<?php

namespace GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\DependencyInjection\Container;

class ImageController extends Controller
{

    protected $imageService;
    protected $dirService;

    /**
     * ImageController constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->imageService = $container->get('gallery.image_service');
        $this->dirService = $container->get('gallery.dir_service');
    }

    /**
     * @param $id
     * @return Response
     */
    public function delete($id): Response
    {
        $result = $this->imageService->deleteImage($id);

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
    public function edit(Request $request, $id): Response
    {
        $newName = $request->getContent();
        $result = $this->imageService->renameImage($id, $newName);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Image renamed', 200);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function newImage(Request $request): Response
    {
        $file = $request->files->get('file');
        $imgName = $request->request->get('name');
        $imgPid = $request->request->get('pid');

        $result = $this->imageService->addImage($imgName, $imgPid, $file);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Image created', 200);
    }
}