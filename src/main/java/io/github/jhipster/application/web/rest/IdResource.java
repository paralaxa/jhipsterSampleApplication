package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Id;
import io.github.jhipster.application.repository.IdRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Id}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IdResource {

    private final Logger log = LoggerFactory.getLogger(IdResource.class);

    private static final String ENTITY_NAME = "id";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IdRepository idRepository;

    public IdResource(IdRepository idRepository) {
        this.idRepository = idRepository;
    }

    /**
     * {@code POST  /ids} : Create a new id.
     *
     * @param id the id to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new id, or with status {@code 400 (Bad Request)} if the id has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ids")
    public ResponseEntity<Id> createId(@RequestBody Id id) throws URISyntaxException {
        log.debug("REST request to save Id : {}", id);
        if (id.getId() != null) {
            throw new BadRequestAlertException("A new id cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Id result = idRepository.save(id);
        return ResponseEntity.created(new URI("/api/ids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ids} : Updates an existing id.
     *
     * @param id the id to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated id,
     * or with status {@code 400 (Bad Request)} if the id is not valid,
     * or with status {@code 500 (Internal Server Error)} if the id couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ids")
    public ResponseEntity<Id> updateId(@RequestBody Id id) throws URISyntaxException {
        log.debug("REST request to update Id : {}", id);
        if (id.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Id result = idRepository.save(id);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, id.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ids} : get all the ids.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ids in body.
     */
    @GetMapping("/ids")
    public List<Id> getAllIds() {
        log.debug("REST request to get all Ids");
        return idRepository.findAll();
    }

    /**
     * {@code GET  /ids/:id} : get the "id" id.
     *
     * @param id the id of the id to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the id, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ids/{id}")
    public ResponseEntity<Id> getId(@PathVariable Long id) {
        log.debug("REST request to get Id : {}", id);
        Optional<Id> id = idRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(id);
    }

    /**
     * {@code DELETE  /ids/:id} : delete the "id" id.
     *
     * @param id the id of the id to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ids/{id}")
    public ResponseEntity<Void> deleteId(@PathVariable Long id) {
        log.debug("REST request to delete Id : {}", id);
        idRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
