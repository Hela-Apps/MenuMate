using AutoMapper;
using Entity.Models;
using Entity.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interface;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuCategoryController : ControllerBase
    {
        private readonly IMenuCategoryService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<MenuCategoryController> _logger;
        public MenuCategoryController(IMenuCategoryService service, IMapper mapper, ILogger<MenuCategoryController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(MenuCategoryVM modelVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var model = _mapper.Map<MenuCategory>(modelVM);
            model.CreatedBy = "system@gmail.com";
            _logger.LogInformation("Menu Category get method Starting.");
            return Ok(await _service.Add(model));
        }

        [HttpGet]
        [Route("Get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(_mapper.Map<MenuCategoryVM>(await _service.Get(id)));
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(MenuCategoryVM modelVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var model = _mapper.Map<MenuCategory>(modelVM);
            _logger.LogInformation("Menu Category update method Starting.");
            return Ok(await _service.Update(model));
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(_mapper.Map<List<MenuCategoryVM>>(await _service.GetAll()));
        }

        [HttpGet]
        [Route("GetMenuCard")]
        public async Task<IActionResult> GetMenuCard()
        {
            return Ok(await _service.GetMenuCard());
        }

        [HttpGet]
        [Route("GetLastId")]
        public async Task<IActionResult> GetLastId()
        {
            return Ok(await _service.GetLastId());
        }
    }
}
