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
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderDetailController> _logger;
        public OrderDetailController(IOrderDetailService service, IMapper mapper, ILogger<OrderDetailController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(OrderDetailVM modelVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var model = _mapper.Map<OrderDetail>(modelVM);
            model.CreatedBy = "system@gmail.com";
            _logger.LogInformation("Order Item Add method Starting.");
            return Ok(await _service.Add(model));
        }

        [HttpGet]
        [Route("Get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(_mapper.Map<OrderDetailVM>(await _service.Get(id)));
        }

        [HttpGet]
        [Route("GetAllbyOrderId")]
        public async Task<IActionResult> GetAll(int orderId)
        {
            return Ok(await _service.GetAllByOrderId(orderId));
        }

    }
}
