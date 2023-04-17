using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
    {
    public class AppointmentModel
        {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AppointmentID { get; set; }

        [MaxLength(255)]
        public string Title { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

        [MaxLength(50)]
        public string Status { get; set; }

        [ForeignKey("Users")]
        public int UserID { get; set; }

        
        }
    }


