Vue.component('v-select', VueSelect.VueSelect);

var appcuota = new Vue({
  el: '#cuotas',
  data: {
    cuota: {
      monto: '',
      plazo: '',
      tasa: '',
      msg: ''
    }
  },
  methods: {
    calcularCuota: function () {
      if (this.cuota.monto == "") {
        alertify.warning("Ingrese un Monto");
      } else if (this.cuota.plazo == "") {
        alertify.warning("Ingrese un plazo");
      } else if (this.cuota.tasa == "") {
        alertify.warning("Ingrese una tasa");
      } else {
        var interes, coutaM, i, año, mon, i2, meses;
        i = this.cuota.tasa;
        año = this.cuota.plazo;
        meses = año * 12;
        mon = this.cuota.monto;
        i2 = i / 100 / 12;
        coutaM = mon * ((Math.pow(1 + i2, meses) * i2) / (Math.pow(1 + i2, meses) - 1));

        this.cuota.msg = "Cuota Mensual: $" + coutaM.toFixed(2);
        this.Limpiar();
      }
    },
    calculo: function (monto, plazo, prestamo) {

    },
    Limpiar: function () {
      this.cuota.monto = "";
      this.cuota.plazo = "";
      this.cuota.tasa = "";
    }
  }
});