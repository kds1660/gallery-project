<?php

namespace GalleryBundle\Controller;

use GalleryBundle\Entity\Images;
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
     * @param Images $image
     * @return Response
     */
    public function delete(Images $image): Response
    {
        $result = $this->imageService->deleteImage($image);

        if ($result) {
            return new Response($result, 500);
        }
        return new Response('Image deleted', 200);
    }

    /**
     * @param Request $request
     * @param Images $image
     * @return Response
     */
    public function edit(Request $request, Images $image): Response
    {
        $newName = $request->getContent();
        $result = $this->imageService->renameImage($image, $newName);

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