using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Users")]
    public class Users
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Name")]
        [StringLength(maximumLength: 45)]
        public string Name { get; set; }

        [Column("Password")]
        [StringLength(maximumLength: 45)]
        public string Password { get; set; }
    }
}
