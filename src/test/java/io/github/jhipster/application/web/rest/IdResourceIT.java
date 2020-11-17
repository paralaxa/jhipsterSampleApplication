package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;
import io.github.jhipster.application.domain.Id;
import io.github.jhipster.application.repository.IdRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link IdResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class IdResourceIT {

    private static final String DEFAULT_VALID_FROM = "AAAAAAAAAA";
    private static final String UPDATED_VALID_FROM = "BBBBBBBBBB";

    private static final String DEFAULT_VALID_TO = "AAAAAAAAAA";
    private static final String UPDATED_VALID_TO = "BBBBBBBBBB";

    @Autowired
    private IdRepository idRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIdMockMvc;

    private Id id;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Id createEntity(EntityManager em) {
        Id id = new Id()
            .validFrom(DEFAULT_VALID_FROM)
            .validTo(DEFAULT_VALID_TO);
        return id;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Id createUpdatedEntity(EntityManager em) {
        Id id = new Id()
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO);
        return id;
    }

    @BeforeEach
    public void initTest() {
        id = createEntity(em);
    }

    @Test
    @Transactional
    public void createId() throws Exception {
        int databaseSizeBeforeCreate = idRepository.findAll().size();
        // Create the Id
        restIdMockMvc.perform(post("/api/ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(id)))
            .andExpect(status().isCreated());

        // Validate the Id in the database
        List<Id> idList = idRepository.findAll();
        assertThat(idList).hasSize(databaseSizeBeforeCreate + 1);
        Id testId = idList.get(idList.size() - 1);
        assertThat(testId.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testId.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
    }

    @Test
    @Transactional
    public void createIdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = idRepository.findAll().size();

        // Create the Id with an existing ID
        id.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdMockMvc.perform(post("/api/ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(id)))
            .andExpect(status().isBadRequest());

        // Validate the Id in the database
        List<Id> idList = idRepository.findAll();
        assertThat(idList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIds() throws Exception {
        // Initialize the database
        idRepository.saveAndFlush(id);

        // Get all the idList
        restIdMockMvc.perform(get("/api/ids?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(id.getId().intValue())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM)))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(DEFAULT_VALID_TO)));
    }
    
    @Test
    @Transactional
    public void getId() throws Exception {
        // Initialize the database
        idRepository.saveAndFlush(id);

        // Get the id
        restIdMockMvc.perform(get("/api/ids/{id}", id.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(id.getId().intValue()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM))
            .andExpect(jsonPath("$.validTo").value(DEFAULT_VALID_TO));
    }
    @Test
    @Transactional
    public void getNonExistingId() throws Exception {
        // Get the id
        restIdMockMvc.perform(get("/api/ids/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateId() throws Exception {
        // Initialize the database
        idRepository.saveAndFlush(id);

        int databaseSizeBeforeUpdate = idRepository.findAll().size();

        // Update the id
        Id updatedId = idRepository.findById(id.getId()).get();
        // Disconnect from session so that the updates on updatedId are not directly saved in db
        em.detach(updatedId);
        updatedId
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO);

        restIdMockMvc.perform(put("/api/ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedId)))
            .andExpect(status().isOk());

        // Validate the Id in the database
        List<Id> idList = idRepository.findAll();
        assertThat(idList).hasSize(databaseSizeBeforeUpdate);
        Id testId = idList.get(idList.size() - 1);
        assertThat(testId.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testId.getValidTo()).isEqualTo(UPDATED_VALID_TO);
    }

    @Test
    @Transactional
    public void updateNonExistingId() throws Exception {
        int databaseSizeBeforeUpdate = idRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIdMockMvc.perform(put("/api/ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(id)))
            .andExpect(status().isBadRequest());

        // Validate the Id in the database
        List<Id> idList = idRepository.findAll();
        assertThat(idList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteId() throws Exception {
        // Initialize the database
        idRepository.saveAndFlush(id);

        int databaseSizeBeforeDelete = idRepository.findAll().size();

        // Delete the id
        restIdMockMvc.perform(delete("/api/ids/{id}", id.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Id> idList = idRepository.findAll();
        assertThat(idList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
