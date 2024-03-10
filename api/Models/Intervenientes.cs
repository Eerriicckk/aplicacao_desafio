using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("recruitment")]
    public class Intervenientes
    {
        [Display(Name = "ID")]
        [Column("ID")]
        public int ID { get; set; }

        [Display(Name = "Exportador")]
        [Column("Exportador")]
        public string Exportador { get; set; }
    }
}
