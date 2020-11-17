package io.github.jhipster.application.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.github.jhipster.application.web.rest.TestUtil;

public class IdTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Id.class);
        Id id1 = new Id();
        id1.setId(1L);
        Id id2 = new Id();
        id2.setId(id1.getId());
        assertThat(id1).isEqualTo(id2);
        id2.setId(2L);
        assertThat(id1).isNotEqualTo(id2);
        id1.setId(null);
        assertThat(id1).isNotEqualTo(id2);
    }
}
