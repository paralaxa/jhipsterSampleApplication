package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Gajaka;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Gajaka entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GajakaRepository extends JpaRepository<Gajaka, Long> {

}
