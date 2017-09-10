<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170908100843 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE images (id INT AUTO_INCREMENT NOT NULL, pid INT DEFAULT NULL, name VARCHAR(31) NOT NULL, path VARCHAR(61) NOT NULL, INDEX pid (pid), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE directories (id INT AUTO_INCREMENT NOT NULL, pid INT DEFAULT NULL, name VARCHAR(31) NOT NULL, INDEX pid (pid), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE images ADD CONSTRAINT FK_E01FBE6A5550C4ED FOREIGN KEY (pid) REFERENCES directories (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE directories ADD CONSTRAINT FK_861FE08F5550C4ED FOREIGN KEY (pid) REFERENCES directories (id) ON UPDATE CASCADE ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE images DROP FOREIGN KEY FK_E01FBE6A5550C4ED');
        $this->addSql('ALTER TABLE directories DROP FOREIGN KEY FK_861FE08F5550C4ED');
        $this->addSql('DROP TABLE images');
        $this->addSql('DROP TABLE directories');
    }
}
