using CadastroCliente.Context;
using CadastroCliente.Models;
using CadastroCliente.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroCliente.Controllers
{
    public class HomeController : Controller
    { 
        private readonly EmpresaContext _context;

        public HomeController(EmpresaContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            ViewBag.cliente = "cliente";

            var ClienteListViewModel = new ClienteListViewModel();
            ClienteListViewModel.Cliente = _context.Cliente;
            return View(ClienteListViewModel);
        }

        public async Task<IActionResult> Create([Bind("ClienteId,Nome,TipoCliente,Documento,DataCadastro,Telefone")] Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cliente);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(cliente);
        }
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cliente = await _context.Cliente.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }
            return View(cliente);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(int id, [Bind("ClienteId,Nome,TipoCliente,Documento,DataCadastro,Telefone")] Cliente cliente)
        {
            if (id != cliente.ClienteId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cliente);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClienteExists(cliente.ClienteId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(cliente);
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cliente = await _context.Cliente
                .FirstOrDefaultAsync(m => m.ClienteId == id);
            if (cliente == null)
            {
                return NotFound();
            }

            return View(cliente);
        }


        [Route("Home/DeleteConfirmed")]
        public IActionResult DeleteConfirmed(int id)
        {

            /*var cliente = empresaContext.Cliente.Find(id);
            empresaContext.Remove(cliente);
            empresaContext.SaveChanges();*/
             
            var cliente = _context.Cliente.Find(id);

            cliente.IsDeleted = true;
            _context.Entry(cliente).State = EntityState.Modified;
            _context.SaveChanges();

            return RedirectToAction("index");
        }

        private bool ClienteExists(int id)
        {
            return _context.Cliente.Any(e => e.ClienteId == id);
        }

        public IActionResult Search(string SearchString)
        {
            string _SearchString = SearchString;
            IEnumerable<Cliente> cliente;

            if (string.IsNullOrEmpty(_SearchString))
            {
                cliente = _context.Cliente.OrderBy(l => l.ClienteId);
            }
            else if(_SearchString.ToLower().Contains("a") || _SearchString.ToLower().Contains("e") || _SearchString.ToLower().Contains("i") || _SearchString.ToLower().Contains("o") || _SearchString.ToLower().Contains("u")) 
            {
                cliente = _context.Cliente.Where(n => n.Nome.ToLower().Contains(_SearchString.ToLower()));
            }
            else 
            {
                cliente = _context.Cliente.Where(n => n.Documento.ToString().Contains(_SearchString.ToLower()));
            }
            return View("~/Views/Home/Index.cshtml", new ClienteListViewModel { Cliente = cliente });
        }
    }
}
 