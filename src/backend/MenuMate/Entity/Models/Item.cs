using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Entity.Models
{
    public class Item : BaseEntity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public int? CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [JsonIgnore]
        public MenuCategory Category { get; set; }
        public bool Active { get; set; }

    }
}
