package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Gajaka;

import io.github.jhipster.application.repository.GajakaRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Gajaka.
 */
@RestController
@RequestMapping("/api")
public class GajakaResource {

    private final Logger log = LoggerFactory.getLogger(GajakaResource.class);

    private static final String ENTITY_NAME = "gajaka";

    private final GajakaRepository gajakaRepository;

    public GajakaResource(GajakaRepository gajakaRepository) {
        this.gajakaRepository = gajakaRepository;
    }

    /**
     * POST  /gajakas : Create a new gajaka.
     *
     * @param gajaka the gajaka to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gajaka, or with status 400 (Bad Request) if the gajaka has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gajakas")
    @Timed
    public ResponseEntity<Gajaka> createGajaka(@RequestBody Gajaka gajaka) throws URISyntaxException {
        log.debug("REST request to save Gajaka : {}", gajaka);
        if (gajaka.getId() != null) {
            throw new BadRequestAlertException("A new gajaka cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gajaka result = gajakaRepository.save(gajaka);
        return ResponseEntity.created(new URI("/api/gajakas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gajakas : Updates an existing gajaka.
     *
     * @param gajaka the gajaka to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gajaka,
     * or with status 400 (Bad Request) if the gajaka is not valid,
     * or with status 500 (Internal Server Error) if the gajaka couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gajakas")
    @Timed
    public ResponseEntity<Gajaka> updateGajaka(@RequestBody Gajaka gajaka) throws URISyntaxException {
        log.debug("REST request to update Gajaka : {}", gajaka);
        if (gajaka.getId() == null) {
            return createGajaka(gajaka);
        }
        Gajaka result = gajakaRepository.save(gajaka);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gajaka.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gajakas : get all the gajakas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gajakas in body
     */
    @GetMapping("/gajakas")
    @Timed
    public List<Gajaka> getAllGajakas() {
        log.debug("REST request to get all Gajakas");
        return gajakaRepository.findAll();
        }

    /**
     * GET  /gajakas/:id : get the "id" gajaka.
     *
     * @param id the id of the gajaka to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gajaka, or with status 404 (Not Found)
     */
    @GetMapping("/gajakas/{id}")
    @Timed
    public ResponseEntity<Gajaka> getGajaka(@PathVariable Long id) {
        log.debug("REST request to get Gajaka : {}", id);
        Gajaka gajaka = gajakaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gajaka));
    }

    /**
     * DELETE  /gajakas/:id : delete the "id" gajaka.
     *
     * @param id the id of the gajaka to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gajakas/{id}")
    @Timed
    public ResponseEntity<Void> deleteGajaka(@PathVariable Long id) {
        log.debug("REST request to delete Gajaka : {}", id);
        gajakaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
