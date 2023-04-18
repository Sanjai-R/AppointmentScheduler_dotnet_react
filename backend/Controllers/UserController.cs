using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppointmentDbContext _context;

        public UserController(AppointmentDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
            if (id != userModel.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {

            var temp = _context.Users
                           .Where(x => x.UserName == userModel.UserName
                           && x.Email == userModel.Email)
                           .FirstOrDefault();

            if (temp == null)
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userModel.Password);
                userModel.Password = hashedPassword;
                _context.Users.Add(userModel);
                await _context.SaveChangesAsync();

            }
            else
                userModel = temp;
            return CreatedAtAction("GetUserModel", new { id = userModel.UserId }, userModel);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserModel>> LoginUser(UserModel data)
        {
            // Find user by email
            var userModel = await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email);

            if (userModel == null)
            {
                return NotFound();
            }

            // Validate password
            if (!BCrypt.Net.BCrypt.Verify(data.Password, userModel.Password))
            {
                return StatusCode(401, "Invalid password");
            }

            // Return user model
            return userModel;
        }

        [HttpGet("SendOtp/email={email}")]
        public async Task<IActionResult> SendOtp(string email)
        {
            Console.WriteLine($"email {email}");
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                // User not found, handle error
                return BadRequest("Invalid Email");
            }
            // Generate OTP
            string otp = GenerateOTP();
            user.RecoveryAnswer = otp;
            // Send OTP to user's email
            Server.handler.Email.testMail(otp, user.Email);
            await _context.SaveChangesAsync();
            // Return success response
            return Ok(new{status=true,message= "OTP has been sent to your email for password reset." });
        }

        [HttpGet("VerifyOtp/otp={otp}/email={email}")]
        public async Task<IActionResult> VerifyOtp(string otp,string email)
            {
            Console.WriteLine($"OTP {otp}");
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                {
                
                // User not found, handle error
                return BadRequest("Invalid Email");
                }
            Console.WriteLine(user.RecoveryAnswer);
           if(user.RecoveryAnswer == otp)
                {
                user.RecoveryAnswer = "";
                _context.SaveChangesAsync();
                return NoContent();
               
                }
            else
                {
                return BadRequest(new { status = false, message = "invalid Otp" });
                }
            
            }

        [HttpPut("ResetPassword")]
        public async Task<IActionResult> GenerateResetPassword(UserModel user)
            {
            Console.WriteLine(user.Email);
            // Retrieve user by email
            var users = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (users == null)
                {
                // User not found, handle error
                return BadRequest("Invalid Email");
                }

            // Verify OTP
       

                // Update user's password
                users.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _context.SaveChanges();

                // Return success response
                return Ok(new { status = true, message = "Password has been reset successfully." });
                

         
            }
        private string GenerateOTP()
        {
            // Generate a 6-digit OTP
            Random random = new Random();
            int otp = random.Next(100000, 999999);
            return otp.ToString();
        }

        private bool UserModelExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

    }
}
