<?php

namespace GalleryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Directories
 *
 * @ORM\Table(name="directories", indexes={@ORM\Index(name="pid", columns={"pid"})})
 * @ORM\Entity(repositoryClass="GalleryBundle\Repositories\ElementsQueries")
 */
class Directories
{
    const P_SEPAR = '/';
    const E_SEPAR = '&';
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
     * @var string
     * @ORM\Column(name="path", type="string", length=255, nullable=false)
     * @Assert\NotBlank()
     * @Assert\Length(
     *     max="255",
     * maxMessage="Max path length=255"
     * )
     */
    private $path;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=31, nullable=false)
     * @Assert\NotBlank()
     * @Assert\Length(
     *     max="31",
     * maxMessage="Max name length=31"
     * )
     */
    private $name;


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
     * @return Directories
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
     * Set pid
     *
     * @param \GalleryBundle\Entity\Directories $pid
     *
     * @return Directories
     */
    public function setPid(\GalleryBundle\Entity\Directories $pid = null)
    {
        $this->pid = $pid;

        return $this;
    }

    /**
     * Get pid
     *
     * @return \GalleryBundle\Entity\Directories
     */
    public function getPid()
    {
        return $this->pid;
    }

    /**
     * @return string
     * Get Path
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set $path
     * @return $this
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }
}
