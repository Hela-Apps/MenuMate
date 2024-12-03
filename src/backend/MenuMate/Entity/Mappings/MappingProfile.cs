using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Entity.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            var assembly = Assembly.GetExecutingAssembly();
            ApplyMapFrom(assembly);
            ApplyMapTo(assembly);
            ApplyMapBoth(assembly);
        }

        private void ApplyMapFrom(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);

                var methodInfo = type.GetMethod("Mapping")
                                 ?? type.GetInterface("IMapFrom`1").GetMethod("Mapping");

                methodInfo?.Invoke(instance, new object[] { this });
            }
        }
        private void ApplyMapTo(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapTo<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);

                var methodInfo = type.GetMethod("Mapping")
                                 ?? type.GetInterface("IMapTo`1").GetMethod("Mapping");

                methodInfo?.Invoke(instance, new object[] { this });
            }
        }
        private void ApplyMapBoth(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapBoth<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);

                var methodInfo = type.GetMethod("Mapping")
                                 ?? type.GetInterface("IMapBoth`1").GetMethod("Mapping");

                methodInfo?.Invoke(instance, new object[] { this });
            }
        }
    }
}