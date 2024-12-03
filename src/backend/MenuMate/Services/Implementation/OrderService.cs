using Entity.Enums;
using Entity.Models;
using Repository.Interfaces;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;
        public OrderService(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<Order> Add(Order order)
        {
            return await _repository.Add(order);
        }

        public async Task<Order> Get(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<IEnumerable<Order>> GetAll()
        {
            return await _repository.GetAll();
        }
        public async Task<Order> Update(Order order)
        {
            return await _repository.Update(order);
        }

        public async Task<Order> UpdateStatus(int id, OrderStatus status)
        {
            return await _repository.UpdateStatus(id, status);
        }

        public async Task<int> GetLastId()
        {
            return await _repository.GetLastId();
        }
    }
}
