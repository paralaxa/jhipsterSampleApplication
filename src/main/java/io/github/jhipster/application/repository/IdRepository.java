package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Id;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Id entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdRepository extends JpaRepository<Id, Long> {
}
