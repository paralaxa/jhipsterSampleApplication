package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Gajaka2;
import io.github.jhipster.application.repository.Gajaka2Repository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Gajaka2Resource REST controller.
 *
 * @see Gajaka2Resource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Gajaka2ResourceIntTest {

    private static final String DEFAULT_REGION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REGION_NAME = "BBBBBBBBBB";

    @Autowired
    private Gajaka2Repository gajaka2Repository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGajaka2MockMvc;

    private Gajaka2 gajaka2;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Gajaka2Resource gajaka2Resource = new Gajaka2Resource(gajaka2Repository);
        this.restGajaka2MockMvc = MockMvcBuilders.standaloneSetup(gajaka2Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gajaka2 createEntity(EntityManager em) {
        Gajaka2 gajaka2 = new Gajaka2()
            .regionName(DEFAULT_REGION_NAME);
        return gajaka2;
    }

    @Before
    public void initTest() {
        gajaka2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createGajaka2() throws Exception {
        int databaseSizeBeforeCreate = gajaka2Repository.findAll().size();

        // Create the Gajaka2
        restGajaka2MockMvc.perform(post("/api/gajaka-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gajaka2)))
            .andExpect(status().isCreated());

        // Validate the Gajaka2 in the database
        List<Gajaka2> gajaka2List = gajaka2Repository.findAll();
        assertThat(gajaka2List).hasSize(databaseSizeBeforeCreate + 1);
        Gajaka2 testGajaka2 = gajaka2List.get(gajaka2List.size() - 1);
        assertThat(testGajaka2.getRegionName()).isEqualTo(DEFAULT_REGION_NAME);
    }

    @Test
    @Transactional
    public void createGajaka2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gajaka2Repository.findAll().size();

        // Create the Gajaka2 with an existing ID
        gajaka2.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGajaka2MockMvc.perform(post("/api/gajaka-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gajaka2)))
            .andExpect(status().isBadRequest());

        // Validate the Gajaka2 in the database
        List<Gajaka2> gajaka2List = gajaka2Repository.findAll();
        assertThat(gajaka2List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGajaka2S() throws Exception {
        // Initialize the database
        gajaka2Repository.saveAndFlush(gajaka2);

        // Get all the gajaka2List
        restGajaka2MockMvc.perform(get("/api/gajaka-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gajaka2.getId().intValue())))
            .andExpect(jsonPath("$.[*].regionName").value(hasItem(DEFAULT_REGION_NAME.toString())));
    }

    @Test
    @Transactional
    public void getGajaka2() throws Exception {
        // Initialize the database
        gajaka2Repository.saveAndFlush(gajaka2);

        // Get the gajaka2
        restGajaka2MockMvc.perform(get("/api/gajaka-2-s/{id}", gajaka2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gajaka2.getId().intValue()))
            .andExpect(jsonPath("$.regionName").value(DEFAULT_REGION_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGajaka2() throws Exception {
        // Get the gajaka2
        restGajaka2MockMvc.perform(get("/api/gajaka-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGajaka2() throws Exception {
        // Initialize the database
        gajaka2Repository.saveAndFlush(gajaka2);
        int databaseSizeBeforeUpdate = gajaka2Repository.findAll().size();

        // Update the gajaka2
        Gajaka2 updatedGajaka2 = gajaka2Repository.findOne(gajaka2.getId());
        // Disconnect from session so that the updates on updatedGajaka2 are not directly saved in db
        em.detach(updatedGajaka2);
        updatedGajaka2
            .regionName(UPDATED_REGION_NAME);

        restGajaka2MockMvc.perform(put("/api/gajaka-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGajaka2)))
            .andExpect(status().isOk());

        // Validate the Gajaka2 in the database
        List<Gajaka2> gajaka2List = gajaka2Repository.findAll();
        assertThat(gajaka2List).hasSize(databaseSizeBeforeUpdate);
        Gajaka2 testGajaka2 = gajaka2List.get(gajaka2List.size() - 1);
        assertThat(testGajaka2.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGajaka2() throws Exception {
        int databaseSizeBeforeUpdate = gajaka2Repository.findAll().size();

        // Create the Gajaka2

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGajaka2MockMvc.perform(put("/api/gajaka-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gajaka2)))
            .andExpect(status().isCreated());

        // Validate the Gajaka2 in the database
        List<Gajaka2> gajaka2List = gajaka2Repository.findAll();
        assertThat(gajaka2List).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGajaka2() throws Exception {
        // Initialize the database
        gajaka2Repository.saveAndFlush(gajaka2);
        int databaseSizeBeforeDelete = gajaka2Repository.findAll().size();

        // Get the gajaka2
        restGajaka2MockMvc.perform(delete("/api/gajaka-2-s/{id}", gajaka2.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Gajaka2> gajaka2List = gajaka2Repository.findAll();
        assertThat(gajaka2List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gajaka2.class);
        Gajaka2 gajaka21 = new Gajaka2();
        gajaka21.setId(1L);
        Gajaka2 gajaka22 = new Gajaka2();
        gajaka22.setId(gajaka21.getId());
        assertThat(gajaka21).isEqualTo(gajaka22);
        gajaka22.setId(2L);
        assertThat(gajaka21).isNotEqualTo(gajaka22);
        gajaka21.setId(null);
        assertThat(gajaka21).isNotEqualTo(gajaka22);
    }
}
