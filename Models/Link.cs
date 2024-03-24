using System.ComponentModel.DataAnnotations;

namespace Slinks.Models
{
    public class Link
    {
        [Key]
        public int Id { get; set; }
        public String InputLink { get; set; }
        public String ShortLink { get; set; }
        public DateTime QueryDate { get; set; }
    }
}
