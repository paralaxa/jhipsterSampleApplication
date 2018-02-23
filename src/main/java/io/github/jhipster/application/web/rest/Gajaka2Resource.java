package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Gajaka2;

import io.github.jhipster.application.repository.Gajaka2Repository;
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
 * REST controller for managing Gajaka2.
 */
@RestController
@RequestMapping("/api")
public class Gajaka2Resource {

    private final Logger log = LoggerFactory.getLogger(Gajaka2Resource.class);

    private static final String ENTITY_NAME = "gajaka2";

    private final Gajaka2Repository gajaka2Repository;

    public Gajaka2Resource(Gajaka2Repository gajaka2Repository) {
        this.gajaka2Repository = gajaka2Repository;
    }

    /**
     * POST  /gajaka-2-s : Create a new gajaka2.
     *
     * @param gajaka2 the gajaka2 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gajaka2, or with status 400 (Bad Request) if the gajaka2 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gajaka-2-s")
    @Timed
    public ResponseEntity<Gajaka2> createGajaka2(@RequestBody Gajaka2 gajaka2) throws URISyntaxException {
        log.debug("REST request to save Gajaka2 : {}", gajaka2);
        if (gajaka2.getId() != null) {
            throw new BadRequestAlertException("A new gajaka2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gajaka2 result = gajaka2Repository.save(gajaka2);
        return ResponseEntity.created(new URI("/api/gajaka-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gajaka-2-s : Updates an existing gajaka2.
     *
     * @param gajaka2 the gajaka2 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gajaka2,
     * or with status 400 (Bad Request) if the gajaka2 is not valid,
     * or with status 500 (Internal Server Error) if the gajaka2 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gajaka-2-s")
    @Timed
    public ResponseEntity<Gajaka2> updateGajaka2(@RequestBody Gajaka2 gajaka2) throws URISyntaxException {
        log.debug("REST request to update Gajaka2 : {}", gajaka2);
        if (gajaka2.getId() == null) {
            return createGajaka2(gajaka2);
        }
        Gajaka2 result = gajaka2Repository.save(gajaka2);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gajaka2.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gajaka-2-s : get all the gajaka2S.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gajaka2S in body
     */
    @GetMapping("/gajaka-2-s")
    @Timed
    public List<Gajaka2> getAllGajaka2S() {
        log.debug("REST request to get all Gajaka2S");
        return gajaka2Repository.findAll();
        }

    /**
     * GET  /gajaka-2-s/:id : get the "id" gajaka2.
     *
     * @param id the id of the gajaka2 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gajaka2, or with status 404 (Not Found)
     */
    @GetMapping("/gajaka-2-s/{id}")
    @Timed
    public ResponseEntity<Gajaka2> getGajaka2(@PathVariable Long id) {
        log.debug("REST request to get Gajaka2 : {}", id);
        Gajaka2 gajaka2 = gajaka2Repository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gajaka2));
    }

    /**
     * DELETE  /gajaka-2-s/:id : delete the "id" gajaka2.
     *
     * @param id the id of the gajaka2 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gajaka-2-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteGajaka2(@PathVariable Long id) {
        log.debug("REST request to delete Gajaka2 : {}", id);
        gajaka2Repository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
