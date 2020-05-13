Vue.component('v-select', VueSelect.VueSelect);

var appcuota = new Vue({
  el: '#cuotas',
  data: {
    cuota: {
      monto: '',
      plazo: '',
      prestamo: '',
      msg: ''
    },
    prestamos: [{
        id: 1,
        label: 'Crédito de Vivienda'
      },
      {
        id: 2,
        label: 'Crédito de Consumo'
      },
      {
        id: 3,
        label: 'Productivo Hasta $100 mil'
      },
      {
        id: 4,
        label: 'Productivo Hasta $1 millón'
      },
      {
        id: 5,
        label: 'Productivo Arriba $1 millón'
      }
    ],
    bancos: {
      promerica: {
        1: '9.7',
        2: '17.54',
        3: '10.73',
        4: '7.87',
        5: '0',
      },
      davivienda: {
        1: '8.47',
        2: '13.96',
        3: '10.60',
        4: '7.51',
        5: '6.33',
      },
      fomento: {
        1: '0',
        2: '12.15',
        3: '18.38',
        4: '10.71',
        5: '0',
      }
    }
  },
  methods: {
    calcularCuota: function () {
      this.cuota.msg = "";
      if (this.cuota.monto == "") {
        alertify.warning("Ingrese un Monto");
      } else if (this.cuota.plazo == "") {
        alertify.warning("Ingrese un plazo");
      } else if (this.cuota.prestamo.id === 1) {
        this.cuota.msg += "Banco Promérica $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.promerica[1])
        this.cuota.msg += "\n\n Banco Davivienda Salvadoreño $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.davivienda[1])
      } else if (this.cuota.prestamo.id === 2) {
        this.cuota.msg += "Banco de Fomento Agropecuario $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.fomento[2])
        this.cuota.msg += "\n\n Banco Promérica $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.promerica[2])
        this.cuota.msg += "\n\n Banco Davivienda Salvadoreño $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.davivienda[2])
      } else if (this.cuota.prestamo.id === 3) {
        this.cuota.msg += "Banco de Fomento Agropecuario $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.fomento[3])
        this.cuota.msg += "\n\n Banco Promérica $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.promerica[3])
        this.cuota.msg += "\n\n Banco Davivienda Salvadoreño $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.davivienda[3])
      } else if (this.cuota.prestamo.id === 4) {
        this.cuota.msg += "Banco de Fomento Agropecuario $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.fomento[4])
        this.cuota.msg += "\n\n Banco Promérica $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.promerica[4])
        this.cuota.msg += "\n\n Banco Davivienda Salvadoreño $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.davivienda[4])
      } else if (this.cuota.prestamo.id === 5) {
        this.cuota.msg = "Banco Davivienda Salvadoreño $" + this.calculo(this.cuota.monto, this.cuota.plazo, this.bancos.davivienda[5])
      } else {
        alertify.warning("seleccione Prestamo");
      }
    },
    calculo: function (monto, plazo, tasa) {
      var coutaM, i, año, mon, i2, meses;
      i = tasa;
      año = plazo;
      meses = año * 12;
      mon = monto;
      i2 = i / 100 / 12;
      coutaM = mon * ((Math.pow(1 + i2, meses) * i2) / (Math.pow(1 + i2, meses) - 1));

      return coutaM.toFixed(2);
    },
    Limpiar: function () {
      this.cuota.monto = "";
      this.cuota.plazo = "";
      this.cuota.tasa = "";
    }
  }
});