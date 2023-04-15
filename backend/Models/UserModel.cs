using System.ComponentModel.DataAnnotations;

namespace Server.Models
    {
    public class UserModel
        {

        [Key]
        [Required]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string RecoveryQuestion { get; set; }
        public string RecoveryAnswer { get; set; }


        }
    }
