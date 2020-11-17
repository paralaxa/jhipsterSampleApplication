package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Id.
 */
@Entity
@Table(name = "id")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Id implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valid_from")
    private String validFrom;

    @Column(name = "valid_to")
    private String validTo;

    @ManyToOne
    @JsonIgnoreProperties(value = "ids", allowSetters = true)
    private Consumer consumerId;

    @ManyToOne
    @JsonIgnoreProperties(value = "ids", allowSetters = true)
    private Consumer consumerId;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValidFrom() {
        return validFrom;
    }

    public Id validFrom(String validFrom) {
        this.validFrom = validFrom;
        return this;
    }

    public void setValidFrom(String validFrom) {
        this.validFrom = validFrom;
    }

    public String getValidTo() {
        return validTo;
    }

    public Id validTo(String validTo) {
        this.validTo = validTo;
        return this;
    }

    public void setValidTo(String validTo) {
        this.validTo = validTo;
    }

    public Consumer getConsumerId() {
        return consumerId;
    }

    public Id consumerId(Consumer consumer) {
        this.consumerId = consumer;
        return this;
    }

    public void setConsumerId(Consumer consumer) {
        this.consumerId = consumer;
    }

    public Consumer getConsumerId() {
        return consumerId;
    }

    public Id consumerId(Consumer consumer) {
        this.consumerId = consumer;
        return this;
    }

    public void setConsumerId(Consumer consumer) {
        this.consumerId = consumer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Id)) {
            return false;
        }
        return id != null && id.equals(((Id) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Id{" +
            "id=" + getId() +
            ", validFrom='" + getValidFrom() + "'" +
            ", validTo='" + getValidTo() + "'" +
            "}";
    }
}
