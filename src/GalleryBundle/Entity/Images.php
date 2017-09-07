<?php

namespace GalleryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * Images
 *
 * @ORM\Table(name="images", indexes={@ORM\Index(name="pid", columns={"pid"})})
 * @ORM\Entity(repositoryClass="GalleryBundle\Repositories\ElementsQueries")
 */
class Images
{
    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=31, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", length=61, nullable=false)
     */
    private $path;

    /**
     * @Assert\File(
     *     mimeTypes = {"application/png", "application/jpeg","application/gif","application/svg"},
     *     mimeTypesMessage = "Please upload a valid PDF"
     * )
     */

    private $image;
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \GalleryBundle\Entity\Directories
     *
     * @ORM\ManyToOne(targetEntity="GalleryBundle\Entity\Directories")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pid", referencedColumnName="id")
     * })
     */
    private $pid;



    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Images
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set path
     *
     * @param string $path
     *
     * @return Images
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set pid
     *
     * @param integer $pid
     *
     * @return Images
     */
    public function setPid(\GalleryBundle\Entity\Directories $pid = null)
    {
        $this->pid = $pid;

        return $this;
    }

    /**
     * Get pid
     *
     * @return integer
     */
    public function getPid()
    {
        return $this->pid;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }
}
