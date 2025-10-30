package com.provaConceito.provaConceito.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "modelo_contador")
@NoArgsConstructor
@AllArgsConstructor
public class modeloContador {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @Column(nullable = false)
  private Long totalCliques;

  public Long getTotalCliques() {
    return this.totalCliques;
  }

  public void setTotalCliques(Long totalCliques) {
    this.totalCliques = totalCliques;
  }
}
