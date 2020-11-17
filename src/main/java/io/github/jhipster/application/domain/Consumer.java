package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Consumer.
 */
@Entity
@Table(name = "consumer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Consumer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "other_fields")
    private String otherFields;

    @OneToMany(mappedBy = "consumerId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Id> ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOtherFields() {
        return otherFields;
    }

    public Consumer otherFields(String otherFields) {
        this.otherFields = otherFields;
        return this;
    }

    public void setOtherFields(String otherFields) {
        this.otherFields = otherFields;
    }

    public Set<Id> getIds() {
        return ids;
    }

    public Consumer ids(Set<Id> ids) {
        this.ids = ids;
        return this;
    }

    public Consumer addId(Id id) {
        this.ids.add(id);
        id.setConsumerId(this);
        return this;
    }

    public Consumer removeId(Id id) {
        this.ids.remove(id);
        id.setConsumerId(null);
        return this;
    }

    public void setIds(Set<Id> ids) {
        this.ids = ids;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consumer)) {
            return false;
        }
        return id != null && id.equals(((Consumer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Consumer{" +
            "id=" + getId() +
            ", otherFields='" + getOtherFields() + "'" +
            "}";
    }
}
