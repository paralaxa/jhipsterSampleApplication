package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Gajaka;
import io.github.jhipster.application.repository.GajakaRepository;
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
 * Test class for the GajakaResource REST controller.
 *
 * @see GajakaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class GajakaResourceIntTest {

    private static final String DEFAULT_REGION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REGION_NAME = "BBBBBBBBBB";

    @Autowired
    private GajakaRepository gajakaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGajakaMockMvc;

    private Gajaka gajaka;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GajakaResource gajakaResource = new GajakaResource(gajakaRepository);
        this.restGajakaMockMvc = MockMvcBuilders.standaloneSetup(gajakaResource)
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
    public static Gajaka createEntity(EntityManager em) {
        Gajaka gajaka = new Gajaka()
            .regionName(DEFAULT_REGION_NAME);
        return gajaka;
    }

    @Before
    public void initTest() {
        gajaka = createEntity(em);
    }

    @Test
    @Transactional
    public void createGajaka() throws Exception {
        int databaseSizeBeforeCreate = gajakaRepository.findAll().size();

        // Create the Gajaka
        restGajakaMockMvc.perform(post("/api/gajakas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gajaka)))
            .andExpect(status().isCreated());

        // Validate the Gajaka in the database
        List<Gajaka> gajakaList = gajakaRepository.findAll();
        assertThat(gajakaList).hasSize(databaseSizeBeforeCreate + 1);
        Gajaka testGajaka = gajakaList.get(gajakaList.size() - 1);
        assertThat(testGajaka.getRegionName()).isEqualTo(DEFAULT_REGION_NAME);
    }

    @Test
    @Transactional
    public void createGajakaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gajakaRepository.findAll().size();

        // Create the Gajaka with an existing ID
        gajaka.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGajakaMockMvc.perform(post("/api/gajakas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gajaka)))
            .andExpect(status().isBadRequest());

        // Validate the Gajaka in the database
        List<Gajaka> gajakaList = gajakaRepository.findAll();
        assertThat(gajakaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGajakas() throws Exception {
        // Initialize the database
        gajakaRepository.saveAndFlush(gajaka);

        // Get all the gajakaList
        restGajakaMockMvc.perform(get("/api/gajakas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gajaka.getId().intValue())))
            .andExpect(jsonPath("$.[*].regionName").value(hasItem(DEFAULT_REGION_NAME.toString())));
    }

    @Test
    @Transactional
    public void getGajaka() throws Exception {
        // Initialize the database
        gajakaRepository.saveAndFlush(gajaka);

        // Get the gajaka
        restGajakaMockMvc.perform(get("/api/gajakas/{id}", gajaka.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gajaka.getId().intValue()))
            .andExpect(jsonPath("$.regionName").value(DEFAULT_REGION_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGajaka() throws Exception {
        // Get the gajaka
        restGajakaMockMvc.perform(get("/api/gajakas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGajaka() throws Exception {
        // Initialize the database
        gajakaRepository.saveAndFlush(gajaka);
        int databaseSizeBeforeUpdate = gajakaRepository.findAll().size();

        // Update the gajaka
        Gajaka updatedGajaka = gajakaRepository.findOne(gajaka.getId());
        // Disconnect from session so that the updates on updatedGajaka are not directly saved in db
        em.detach(updatedGajaka);
        updatedGajaka
            .regionName(UPDATED_REGION_NAME);

        restGajakaMockMvc.perform(put("/api/gajakas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGajaka)))
            .andExpect(status().isOk());

        // Validate the Gajaka in the database
        List<Gajaka> gajakaList = gajakaRepository.findAll();
        assertThat(gajakaList).hasSize(databaseSizeBeforeUpdate);
        Gajaka testGajaka = gajakaList.get(gajakaList.size() - 1);
        assertThat(testGajaka.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGajaka() throws Exception {
        int databaseSizeBeforeUpdate = gajakaRepository.findAll().size();

        // Create the Gajaka

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGajakaMockMvc.perform(put("/api/gajakas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gajaka)))
            .andExpect(status().isCreated());

        // Validate the Gajaka in the database
        List<Gajaka> gajakaList = gajakaRepository.findAll();
        assertThat(gajakaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGajaka() throws Exception {
        // Initialize the database
        gajakaRepository.saveAndFlush(gajaka);
        int databaseSizeBeforeDelete = gajakaRepository.findAll().size();

        // Get the gajaka
        restGajakaMockMvc.perform(delete("/api/gajakas/{id}", gajaka.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Gajaka> gajakaList = gajakaRepository.findAll();
        assertThat(gajakaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gajaka.class);
        Gajaka gajaka1 = new Gajaka();
        gajaka1.setId(1L);
        Gajaka gajaka2 = new Gajaka();
        gajaka2.setId(gajaka1.getId());
        assertThat(gajaka1).isEqualTo(gajaka2);
        gajaka2.setId(2L);
        assertThat(gajaka1).isNotEqualTo(gajaka2);
        gajaka1.setId(null);
        assertThat(gajaka1).isNotEqualTo(gajaka2);
    }
}
