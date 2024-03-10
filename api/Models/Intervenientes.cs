using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("recruitment")]
    public class Intervenientes
    {

        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Exportador")]
        [StringLength(maximumLength: 45)]
        public string Exportador { get; set; }

        [Column("Importador")]
        [StringLength(maximumLength: 45)]
        public string Importador { get; set; }

        [Column("DataEmbarque")]
        [DataType(DataType.DateTime)]
        public DateTime DataEmbarque { get; set; }

        [Column("PrevisaoDeEmbarque")]
        [DataType(DataType.DateTime)]
        public DateTime PrevisaoDeEmbarque { get; set; }

        [Column("DataChegada")]
        [DataType(DataType.DateTime)]
        public DateTime DataChegada { get; set; }

        [Column("PrevisaoDeChegada")]
        [DataType(DataType.DateTime)]
        public DateTime PrevisaoDeChegada { get; set; }

        [Column("DI")]
        [StringLength(maximumLength: 45)]
        public string DI { get; set; }

        [Column("Navio")]
        [StringLength(maximumLength: 45)]
        public string Navio { get; set; }

        [Column("Master")]
        [StringLength(maximumLength: 45)]
        public string Master { get; set; }

        [Column("House")]
        [StringLength(maximumLength: 45)]
        public string House { get; set; }

        [Column("Fatura")]
        [StringLength(maximumLength: 45)]
        public string Fatura { get; set; }

        [Column("FreteModo")]
        [StringLength(maximumLength: 45)]
        public string FreteModo { get; set; }

        [Column("Container")]
        [StringLength(maximumLength: 45)]
        public string Container { get; set; }

        [Column("CanalParametrizacao")]
        [StringLength(maximumLength: 45)]
        public string CanalParametrizacao { get; set; }

        [Column("Origem")]
        [StringLength(maximumLength: 45)]
        public string Origem { get; set; }

        [Column("Destino")]
        [StringLength(maximumLength: 45)]
        public string Destino { get; set; }

        [Column("LiberadoParaFaturamento")]
        [DataType(DataType.DateTime)]
        public DateTime LiberadoParaFaturamento { get; set; }

    }
}
