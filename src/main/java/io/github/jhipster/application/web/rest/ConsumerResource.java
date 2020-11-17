package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Consumer;
import io.github.jhipster.application.repository.ConsumerRepository;
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
 * REST controller for managing {@link io.github.jhipster.application.domain.Consumer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsumerResource {

    private final Logger log = LoggerFactory.getLogger(ConsumerResource.class);

    private static final String ENTITY_NAME = "consumer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsumerRepository consumerRepository;

    public ConsumerResource(ConsumerRepository consumerRepository) {
        this.consumerRepository = consumerRepository;
    }

    /**
     * {@code POST  /consumers} : Create a new consumer.
     *
     * @param consumer the consumer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consumer, or with status {@code 400 (Bad Request)} if the consumer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consumers")
    public ResponseEntity<Consumer> createConsumer(@RequestBody Consumer consumer) throws URISyntaxException {
        log.debug("REST request to save Consumer : {}", consumer);
        if (consumer.getId() != null) {
            throw new BadRequestAlertException("A new consumer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consumer result = consumerRepository.save(consumer);
        return ResponseEntity.created(new URI("/api/consumers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consumers} : Updates an existing consumer.
     *
     * @param consumer the consumer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consumer,
     * or with status {@code 400 (Bad Request)} if the consumer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consumer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consumers")
    public ResponseEntity<Consumer> updateConsumer(@RequestBody Consumer consumer) throws URISyntaxException {
        log.debug("REST request to update Consumer : {}", consumer);
        if (consumer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consumer result = consumerRepository.save(consumer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, consumer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consumers} : get all the consumers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consumers in body.
     */
    @GetMapping("/consumers")
    public List<Consumer> getAllConsumers() {
        log.debug("REST request to get all Consumers");
        return consumerRepository.findAll();
    }

    /**
     * {@code GET  /consumers/:id} : get the "id" consumer.
     *
     * @param id the id of the consumer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consumer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consumers/{id}")
    public ResponseEntity<Consumer> getConsumer(@PathVariable Long id) {
        log.debug("REST request to get Consumer : {}", id);
        Optional<Consumer> consumer = consumerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consumer);
    }

    /**
     * {@code DELETE  /consumers/:id} : delete the "id" consumer.
     *
     * @param id the id of the consumer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consumers/{id}")
    public ResponseEntity<Void> deleteConsumer(@PathVariable Long id) {
        log.debug("REST request to delete Consumer : {}", id);
        consumerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
