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
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentDbContext _context;

        public AppointmentController(AppointmentDbContext context)
        {
            _context = context;
        }

        // GET: api/Appointment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentModel>>> GetAppointment()
        {
            return await _context.Appointment.ToListAsync();
        }

        // GET: api/Appointment/GetAppointmentByUserId/{userId}
        [HttpGet("GetAppointmentByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<AppointmentModel>>> GetAppointmentByUserId(int userId)
            {
            // Fetch appointments based on user ID
            var appointments = await _context.Appointment
                                            .Where(a => a.UserID == userId)
                                            .ToListAsync();

            return appointments;
            }


        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentModel>> GetAppointmentModel(int id)
        {
            var appointmentModel = await _context.Appointment.FindAsync(id);

            if (appointmentModel == null)
            {
                return NotFound();
            }

            return appointmentModel;
        }

        // PUT: api/Appointment/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointmentModel(int id, AppointmentModel appointmentModel)
        {
            Console.WriteLine(appointmentModel.Description);
            if (id != appointmentModel.AppointmentID)
            {
                return BadRequest();
            }

            _context.Entry(appointmentModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentModelExists(id))
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

        // POST: api/Appointment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AppointmentModel>> PostAppointmentModel(AppointmentModel appointmentModel)
        {
            Console.WriteLine("hey");
            Console.WriteLine(appointmentModel.Title);
            appointmentModel.Status = "Scheduled";
            _context.Appointment.Add(appointmentModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointmentModel", new { id = appointmentModel.AppointmentID }, appointmentModel);
        }

        // DELETE: api/Appointment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointmentModel(int id)
        {
            var appointmentModel = await _context.Appointment.FindAsync(id);
            if (appointmentModel == null)
            {
                return NotFound();
            }

            _context.Appointment.Remove(appointmentModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppointmentModelExists(int id)
        {
            return _context.Appointment.Any(e => e.AppointmentID == id);
        }
    }
}
